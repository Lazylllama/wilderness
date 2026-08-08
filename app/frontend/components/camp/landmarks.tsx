import {Link} from "@inertiajs/react";
import {CART, RANGER} from "@/lib/camp-layout";
import {CartArt, RangerPostArt} from "./art";
import {CampObject} from "./stage";

function SignPost({label}: {label: string}) {
    return (
        <span>
            {label}
        </span>
    );
}

export function ShopCart() {
    return (
        <CampObject x={CART.x} y={CART.y}>
            <Link href="/shop">
                <CartArt/>
                <Signpost label="shop"/>
            </Link>
        </CampObject>
    )
}