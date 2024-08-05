import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const List = ({ data, handleDelete, add }) => {
  console.log(add);
  const router = useRouter();
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between border-b border-gray-400 text-2xl md:text-xl font-medium py-2">
        <span> List</span>
        <button
          onClick={() => router.push(`/admin/${add}`)}
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Discount</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">{item.title}</td>
                <td className="p-4">{item.description}</td>
                <td className="p-4">₹{item.discountedPrice}</td>
                <td className="p-4">{item.discount}%</td>
                <td className="p-4 space-y-2">
                  <Link href={`/${add}?id=${item.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-1 rounded">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                  <Link href={`/admin/edit/${add}?id=${item.id}`}>
                    <button className="bg-green-500 text-white px-4 py-1 rounded">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default List;
