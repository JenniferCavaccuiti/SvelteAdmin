<script lang="ts">
	import Tabs from '../Tabs/Tabs.svelte';
	import type { Tabs as TabsField } from '$lib/FieldDefinitions/Tabs';
	import type { CrudOperation } from '$lib/Crud/Operations';
	import type { ThemeConfig } from '$lib/themes/ThemeConfig';

	export let field: TabsField;
	export let operation: CrudOperation;
	export let entityObject: Record<string, unknown> = {};
	export let value: unknown;
	export let theme: ThemeConfig;
</script>

<Tabs FieldComponent={theme.formField} {field} {operation} {entityObject} {value} {theme} />
