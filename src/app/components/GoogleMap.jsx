'use client';

const GoogleMap = ({
  address = 'House 42, Road 07, Section 10, Mirpur, Dhaka 1216, Bangladesh.',
  width = '100%',
  height = '400',
  zoom = '15',
}) => {
  const encodedAddress = encodeURIComponent(address);

  // ⭐ Marker যোগ করা হয়েছে marker parameter দিয়ে
  const mapSrc = `https://maps.google.com/maps?&q=${encodedAddress}&markers=color:red%7C${encodedAddress}&z=${zoom}&output=embed`;

  return (
    <div className="map-container">
      <iframe
        src={mapSrc}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Google Map of ${address}`}
      />
    </div>
  );
};

export default GoogleMap;
