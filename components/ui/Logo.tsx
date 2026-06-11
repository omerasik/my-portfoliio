import Image from "next/image";

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className="relative">
      <Image 
        src="/oa_logo.webp" 
        alt="Omer Asik Logo" 
        width={48} 
        height={48} 
        className={className}
        priority
      />
    </div>
  );
}
