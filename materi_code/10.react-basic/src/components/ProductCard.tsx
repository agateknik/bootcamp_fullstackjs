interface productProps {
  title: string;
  price: number;
  description: string;
  image: string;
}

export const ProductCard = ({
  title,
  price,
  description,
  image,
}: productProps) => {
  return (
    <div className="p-4 rounded-2xl bg-amber-50">
      <div className="text-2xl">{title}</div>
      <div className="text-4xl mt-2 text-red-700">USD {price}</div>
      <div className="mt-3">{description}</div>
      <img className="mt-5" src={image} alt={title} />
    </div>
  );
};
