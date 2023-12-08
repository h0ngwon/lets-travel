import { youtubeApi } from 'apis/youtube';
import { useEffect, useState } from 'react';

const Youtube = () => {
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
            console.log(res.data.items);
            setVideoList(res.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {videoList.map((v) => {
                return (
                    <div>
                        <iframe
                            id='player'
                            title={v.id}
                            type='text/html'
                            width='640'
                            height='360'
                            src={`http://www.youtube.com/embed/${v.snippet.resourceId.videoId}?enablejsapi=1&origin=http://example.com`}
                        ></iframe>
                    </div>
                );
            })}
        </div>
    );
};

export default Youtube;
