import Icon from '@/components/ui/Icon';

interface CrumbProps {
  trail: string[];
}

export default function Crumb({ trail }: CrumbProps) {
  return (
    <div className="crumb">
      <span className="home"><Icon name="home" size={12} /></span>
      {trail.map((t, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="chev-right" size={10} />
          <span className={i === trail.length - 1 ? 'here' : ''}>{t}</span>
        </span>
      ))}
    </div>
  );
}
