"use client";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface ApprovalAnimationProps {
  label: string;
}

export const ApprovalAnimation = ({ label }: ApprovalAnimationProps) => {
  return (
    <div className='w-160'>
      <DotLottieReact
        src={label === 'approval' ? 'https://lottie.host/0be61da7-d300-4e8c-9a85-3851888993f7/ZamlXJEQ50.lottie' : label === 'used' ? 'https://lottie.host/7836c2be-1061-4313-9817-017ba1c00f8b/QsSlDIyAre.lottie' : label === 'available' ? 'https://lottie.host/61b7b68f-d4b3-4324-aa07-46153a89f8da/jVBSXGz3HY.lottie' : "https://lottie.host/e9200eba-2fbb-4969-9de7-dd9d21d27820/TnAGdzInTZ.lottie"}
        loop
        autoplay
        className='object-center'
      />
    </div>
  );
};