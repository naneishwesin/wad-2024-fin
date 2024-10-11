import Customer from "@/models/Customer";

export async function POST(request) {
  try {
    const body = await request.json();
    const customer = new Customer(body);
    await customer.save();
    return new Response(JSON.stringify(customer), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error creating customer", { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    if (params && params.id) {
      // Fetch a specific customer by ID
      const customer = await Customer.findById(params.id);
      if (!customer) {
        return new Response("Customer not found", { status: 404 });
      }
      return new Response(JSON.stringify(customer), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Fetch all customers
      const customers = await Customer.find().sort({ memberNumber: -1 });
      return new Response(JSON.stringify(customers), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response("Error fetching customers", { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const customer = await Customer.findByIdAndUpdate(body._id, body, { new: true });
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify(customer), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error updating customer", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Customer deleted successfully" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error deleting customer", { status: 500 });
  }
}
