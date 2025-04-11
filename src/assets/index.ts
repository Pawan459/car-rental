import { Car } from "@/types"
import type { StaticImageData } from "next/image";

import JAGUAR_E_PACE from './cars/jaguar-e-pace.jpg';
import MERCEDES_VITO from './cars/mercedes-vito.jpg';
import NISSAN_QASHQAI from './cars/nissan-qashqai.jpg';
import SEAT_IBIZA from './cars/seat-ibiza.webp';
import TOYOTA_YARIS from './cars/toyota-yaris.webp';


const CAR_IMAGES: { [brand: string]: { [model: string]: StaticImageData } } = {
  'toyota': {
    'yaris': TOYOTA_YARIS
  },
  'seat': {
    'ibiza': SEAT_IBIZA
  },
  'nissan': {
    'qashqai': NISSAN_QASHQAI
  },
  'jaguar': {
    'e-pace': MERCEDES_VITO
  },
  'mercedes': {
    'vito': JAGUAR_E_PACE
  }
}

export const getImageMapper = (car: Car) => {
  const { brand, model } = car;

  const brandLower = brand.toLowerCase();
  const modelLower = model.toLowerCase();

  if (CAR_IMAGES[brandLower] && CAR_IMAGES[brandLower][modelLower]) {
    return CAR_IMAGES[brandLower][modelLower];
  }
  return 'https://picsum.photos/300/200?random=1';
}