"use client";

export default function Map() {
  return (
    <div className="w-full h-[300px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.672889518004!2d-83.41134!3d42.491493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824b1d35466d1e1%3A0x6d23a2ef3a3eb9ab!2s27555%20Executive%20Dr%20%23%20100%2C%20Farmington%20Hills%2C%20MI%2048331%2C%20USA!5e0!3m2!1sen!2sus!4v1695155555555"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
