export default function TeamCard({ member }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden hover:lift transition-all duration-300 group">
      <div className="h-72 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-lg">{member.name}</h3>
        <p className="text-brand-500 font-semibold text-sm mt-1 mb-3">{member.role}</p>
        {member.description && (
          <p className="text-gray-500 leading-relaxed text-sm">{member.description}</p>
        )}
      </div>
    </div>
  );
}
