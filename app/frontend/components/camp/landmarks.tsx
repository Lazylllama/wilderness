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
                <SignPost label="shop"/>
            </Link>
        </CampObject>
    )
}

export function RangerPost() {
    return (
        <CampObject x={RANGER.x} y={RANGER.y}>
            <Link href="/ranger">
                <RangerPostArt/>
                <SignPost label="ranger post"/>
            </Link>
        </CampObject>
    )
}