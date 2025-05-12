import React, { useMemo } from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

const RemotionComposition = ({ videoData, setDurationInFrame }) => {
    const captions = videoData?.data?.captions;
    const { fps } = useVideoConfig();
    const imageList = videoData?.data?.imagse;
    const frame = useCurrentFrame()
    const totalDuration = useMemo(() => {
        if (!captions || captions.length === 0 || !fps) return 0;
        const duration = captions[captions.length - 1].end * fps;
        setDurationInFrame(duration);
        return duration;
    }, [captions, fps, setDurationInFrame]);

    if (!captions || !imageList || totalDuration === 0) {
        return <h2 className='text-3xl'>Loading...</h2>;
    }


    const getCurrentCaption = ()=>{
        const currentTime = frame/30;
        const currentCaption = captions?.find((item)=> currentTime>=item?.start && currentTime<=item?.end)
        return currentCaption? currentCaption?.word: ''
    }

    return (
        <div>

            <AbsoluteFill>
                {imageList?.map((item, index) => {
                    const startTime = (index * totalDuration) / imageList.length;
                    const duration = totalDuration / imageList.length;
                    const scale = (index) => interpolate(
                        frame,
                        [startTime, startTime + duration / 2, startTime + duration],
                        index % 2 === 0 ? [1, 1.2, 1] : [1.2, 1, 1.2],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    )
                    return (
                        <>
                            <Sequence key={index} from={startTime} durationInFrames={duration}>
                                <AbsoluteFill>
                                    <Img
                                        src={item}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transform: `scale(${scale(index)})`
                                        }}
                                    />
                                </AbsoluteFill>
                            </Sequence>
                        </>
                    );
                })}
            </AbsoluteFill>
            <AbsoluteFill
                style={{
                    color: 'black',
                    justifyContent: 'center',
                    bottom: 50,
                    height: 150,
                    top: undefined, 
                    fontSize: '80px', 
                    textAlign: 'center'
                }}
            >
                <h2 className='text-8xlxl text-amber-800 font-bold'>{getCurrentCaption()}</h2>
            </AbsoluteFill>
            <AbsoluteFill>
                {videoData?.data?.audioUrl && <Audio src={videoData?.data?.audioUrl} />}
            </AbsoluteFill>
        </div>
    );
};

export default RemotionComposition;
