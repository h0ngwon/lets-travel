import Maps from 'components/Maps';
import MapComponent from 'components/MapComponent';

const App = () => {
    return (
        <>
            <div>App</div>
            <div style={{ width: '1200px', height: '700px' }}>
                이게 어떤 원리인거지 도대체
                {/* <Maps /> */}
                <MapComponent />
            </div>
        </>
    );
};

export default App;
