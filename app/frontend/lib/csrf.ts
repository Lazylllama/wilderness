export function csrfToken() {
	return (
		document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? ""
	);
}