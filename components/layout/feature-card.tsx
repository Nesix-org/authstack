interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard ({ icon, title, description }: FeatureCardProps)  {
  return (
    <div className="group border-2 border-border bg-background p-8 shadow-sharp transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-sharp-hover hover:bg-black hover:text-white hover:rounded-sm">
      <div className="mb-6 inline-block border-2 border-foreground p-4 group-hover:border-white">
        {icon}
      </div>
      <h3 className="mb-3 font-heading text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};