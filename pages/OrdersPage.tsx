import { orders } from "@/data/orders";

export function OrdersPage() {

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-slate-900 mb-8 font-bold text-3xl sm:text-4xl">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-slate-900 font-semibold text-lg sm:text-xl">
                    Order {order.id}
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">Date: {order.date}</p>
                  <p className="text-slate-600 text-sm">Total: {order.total}</p>
                </div>
                <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium self-start sm:self-center">
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-slate-700 font-medium mb-3 text-sm sm:text-base">Items:</p>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 text-sm sm:text-base"
                    >
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-900 font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;