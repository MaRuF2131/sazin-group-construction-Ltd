export default function SpecTable({ specs }) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-brand-700">
            <th className="text-left text-[11px] font-bold text-white uppercase tracking-[0.15em] px-5 py-3.5 w-2/5">
              Specification
            </th>
            <th className="text-left text-[11px] font-bold text-white uppercase tracking-[0.15em] px-5 py-3.5">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, i) => (
            <tr key={spec.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="px-5 py-3 text-sm font-medium text-brand-700 border-t border-gray-100">
                {spec.label}
              </td>
              <td className="px-5 py-3 text-sm text-gray-600 border-t border-gray-100">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}