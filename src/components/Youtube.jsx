import { youtubeApi } from 'apis/youtube';
import { useEffect, useState } from 'react';

const Youtube = ({ cityTitle }) => {
    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        getYoutubeVideos();
    }, []);

    const getYoutubeVideos = async () => {
        try {
            const res = await youtubeApi.get('playlistItems', {
                params: {
                    part: 'snippet',
                    playlistId: 'PLEJrijY-Z4cBcAoOfujrtSauwxc9XE89A',
                    maxResults: 48,
                },
            });
            setVideoList(res.data.items);
        } catch (error) {}
    };

    return (
        <div>
            {videoList
                .filter((v) => v.snippet.title.includes(`${cityTitle}`))
                .map((v) => {
                    return (
                        <div key={v.id}>
                            <iframe
                                id='player'
                                title={v.id}
                                type='text/html'
                                width='1280'
                                height='720'
                                src={`http://www.youtube.com/embed/${v.snippet.resourceId.videoId}?enablejsapi=1&origin=http://example.com`}
                            ></iframe>
                        </div>
                    );
                })}
        </div>
    );
};

export default Youtube;
