type StatCardProps = {
  label: string;
  amount: number;
};

export default function StatCard({ label, amount }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8">
      <h3 className="text-gray-500">{label}</h3>
      <h2 className="text-3xl text-center">{amount}</h2>
    </div>
  );
}
