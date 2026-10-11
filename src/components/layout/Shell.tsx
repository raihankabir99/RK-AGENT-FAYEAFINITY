import { ReactNode } from 'react';

export const Shell = ({
  sidebar,
  commandBar,
  children
}: {
  sidebar: ReactNode;
  commandBar: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="flex h-screen bg-[#070709] text-neutral-100 font-sans overflow-hidden selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      {sidebar}
      <div className="flex flex-col flex-1 min-w-0 bg-[#070709]">
        {commandBar}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 max-w-7xl mx-auto w-full relative">
          {/* Ambient Lighting FX */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30"></div>
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
};

