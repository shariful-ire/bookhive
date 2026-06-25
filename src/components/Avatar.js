"use client";

import { useState } from "react";

export default function Avatar({ src, name, size = 112 }) {
  const [failed, setFailed] = useState(false);
  const initial = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div
      className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={name || "Avatar"}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-4xl font-bold">
          {initial}
        </div>
      )}
    </div>
  );
}
