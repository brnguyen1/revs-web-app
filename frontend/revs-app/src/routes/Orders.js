import EntityTable from "../components/EntityTable"
import CustomerHeader from "../components/CustomerHeader";

function Orders() {
    return (
        <div>
            <CustomerHeader />
            <EntityTable entityName="orders" />
        </div>
    );
}

export default Orders