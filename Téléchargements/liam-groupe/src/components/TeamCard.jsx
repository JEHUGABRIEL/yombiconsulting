export default function TeamCard({ member }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      <div className="h-72">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-lg">{member.name}</h3>
        <p className="text-coral-500 font-semibold text-sm mt-1 mb-3">{member.role}</p>
        {member.description && (
          <p className="text-gray-500 leading-relaxed text-sm">{member.description}</p>
        )}
      </div>
    </div>
  );
}
