import {Link,router} from "@inertiajs/react";
import {Eye, Search} from "lucide-react";
import {useState} from "react";
import {AdminShell, AdminTable, Tag} from "@/components/admin/shell";
import {Button} from "@/components/wilderness/button";
import {Input} from "@/components/wilderness/input";
import {relativeTime} from "@/lib/camp-layout";
type AdminUser = {
    id: number;
	name: string;
	email: string;
	slack_id: string | null;
	verification_status: string | null;
	admin: boolean;
	camp_access: boolean;
	actor_enabled: boolean;
	rsvped_at: string | null;
	tents_count: number;
};
export default function AdminUsers({
    users,query, flash_notice,
}:{
    users: AdminUser[];
    query: string;
	flash_notice: string | null;
}) {
    const [search, setSearch] = useState(query);

    function runSearch(event: React.FormEvent) {
        event.preventDefault();
        router.get(
			"/admin/users",
			{q: search},
			{preserveState: true, preserveScroll: true, replace: true},
		);
    }

    function toggleField(user: AdminUser, field: "admin" | "camp_access") {
        router.patch(
			`/admin/users/${user.id}`,
			{field, q: query},
		);
    }

    return (
        <AdminShell title="Users" subtitle="newest rsvps first" flashNotice={flash_notice}>
            <div className="flex flex-col gap-4">
                <form onSubmit={runSearch} className="flex flex-row gap-2">
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="name, email or slack id"/>
                    <Button type="submit" variant="secondary" className="h-11">
                        <Search size={18} strokeWidth={3}/></Button>
                </form>

                <AdminTable headers={[
                    "camper",
						"slack",
						"verified",
						"rsvped",
						"tents",
                        "role",
                        ""
                ]}>
                    {users.length === 0 && (
						<tr>
							<td
								colSpan={7}
								className="px-4 py-8 text-center font-serif italic text-foreground/50"
							>
								no users yet, we gotta get some lmao
							</td>
						</tr>
					)}
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold">
                                        {user.name}
                                    </span>
                                    <span className="font-serif text-sm text-foreground/50">
										{user.email}
									</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 font-mono text-sm text-foreground/67">
                                {user.slack_id?? "—"}
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground/67">
								{user.verification_status || "—"}
							</td>
                            <td className="px-4 py-3 font-serif text-sm text-foreground/67">
								{relativeTime(user.rsvped_at)}
							</td>
                            <td className="px-4 py-3 text-sm">{user.tents_count}</td>
                            <td className="px-4 py-3">
                                <button type="button" onClick={() => toggleField(user, "admin")}>
                                    <Tag on={user.admin} onLabel="admin" offLabel="—"/>
                                </button>
                            </td>
                            <td className="px-4 py-3">
                                <Button
                                    variant="outline"
                                    className="px-3 py-1.5 text-sm"
                                    onClick={() => router.visit(`/admin/users/${user.id}`)}>
                                    <Eye size={16} strokeWidth={2.5}/>View
                                </Button>
                            </td>
                        </tr>
                    ))}
                </AdminTable>
            </div>
        </AdminShell>
    );
}