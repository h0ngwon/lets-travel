import { youtubeApi } from 'apis/api';
import { useEffect, useState } from 'react';

const Youtube = () => {
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        
    }, [])

    const getYoutubeVideos = async () => {
        try {
            const res = await youtubeApi.get('search', {
                params: {
                    q:'후쿠오카 여행',
                    maxResults: 3,
                    regionCode: 'KR',
                    order:'relevance'
                }
            });
            setVideoList(res.data.items);
        } catch (error) {
            console.log(error);
        }
    }

    return <>
    {
    videoList.map((v) => {
        return <div id={v.id.videoId}>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
            src={`https://www.youtube.com/embed/${v.id.videoId}?autoplay=0&origin=http://example.com`}
            frameborder="0" title={v.id.videoId}>
                </iframe></div>
    })};

    </>;
};

export default Youtube;
