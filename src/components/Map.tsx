const Map = (props: {mapLat:number, mapLng:number}) => {
    let map;
    async function initMap(): Promise<void> {
        const position = { lat: props.mapLat, lng: props.mapLng };

        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        map = new Map(
            document.getElementById('map') as HTMLElement,
            {
                zoom: 4,
                center: position,
                mapId: 'DEMO_MAP_ID',
            }
        );

        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: 'Uluru'
        });
    }

    initMap();
    return (
        <div id="map">
        </div>
    )
}