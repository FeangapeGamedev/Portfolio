import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { NeonShader } from "../shaders/neonShader";

extend({ TextGeometry });

const ThreeDText = ({ text, position, rotation, color, size, height, isNeon = false }) => {
  const [font, setFont] = useState(null);
  const [textMesh, setTextMesh] = useState(null);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load("/Kind Regards_Regular.json", (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

  useEffect(() => {
    if (font) {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: size || 2,
        height: height || 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.03,
      });

      textGeometry.center();

      let material;

      if (isNeon) {
        material = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(color) }, // ✅ Pass color to shader
            intensity: { value: 3.5 }, // ✅ Adjust bloom intensity
            time: { value: 0.0 }, // ✅ Controls flickering
          },
          vertexShader: NeonShader.vertexShader,
          fragmentShader: NeonShader.fragmentShader,
        });
      } else {
        material = new THREE.MeshStandardMaterial({ color });
      }

      const mesh = new THREE.Mesh(textGeometry, material);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      setTextMesh(mesh);
    }
  }, [font, text, position, rotation, color, size, height, isNeon]);

  useFrame(({ clock }) => {
    if (isNeon && textMesh) {
      textMesh.material.uniforms.time.value = clock.elapsedTime; // Flickering Effect
    }
  });

  return textMesh ? (
    <group scale={[0.5, 0.2, 0.001]}>
      <primitive object={textMesh} />
    </group>
  ) : null;
};

export default ThreeDText;
