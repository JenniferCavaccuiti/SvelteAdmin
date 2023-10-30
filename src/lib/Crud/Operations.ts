import type { ComponentType, SvelteComponent } from 'svelte';
import type { Field } from '$lib/FieldDefinitions/Field';
import type { Options } from '$lib/FieldDefinitions/Options';
import CrudNew from '../themes/carbon/Crud/CrudNew.svelte';
import CrudEdit from '../themes/carbon/Crud/CrudEdit.svelte';
import CrudList from '../themes/carbon/Crud/CrudList.svelte';
import CrudDelete from '../themes/carbon/Crud/CrudDelete.svelte';
import CrudView from '../themes/carbon/Crud/CrudView.svelte';
import type { CrudDefinition } from '$lib/Crud/definition';
import type { DashboardDefinition } from '$lib/Dashboard/definition';
import type { Action } from '$lib/actions';
import type { KeyValueObject } from '$lib/genericTypes';

export type CrudOperationName = 'new' | 'edit' | 'view' | 'list' | 'delete' | string;

export type OperationCallbackName = 'submit' | string;

export type OperationCallback = (event: Event) => unknown | void;
export type OperationEventCallback = [event: OperationCallbackName, callback: OperationCallback];

export type TemplateComponent = ComponentType;
// SvelteComponent<{
// 	dashboard: DashboardDefinition<unknown>;
// 	crud: CrudDefinition<unknown>;
// 	operation: CrudOperation<unknown>;
// 	requestParameters: KeyValueObject;
// }>

export interface CrudOperation<T> {
	readonly name: CrudOperationName;
	readonly label: string;
	readonly displayComponent: TemplateComponent;
	readonly fields: Array<Field<Options>>;
	readonly actions: Array<Action>;
	readonly eventHandlers: Array<OperationEventCallback>;
	readonly options: Record<string, string | unknown>;
}

export class BaseCrudOperation<T> implements CrudOperation<T> {
	public readonly name: CrudOperationName;
	public readonly displayComponent: TemplateComponent;
	public readonly fields: Array<Field<Options>>;
	public readonly label: string;
	public readonly actions: Array<Action>;
	public readonly eventHandlers: Array<OperationEventCallback> = [];
	public readonly options: Record<string, string | unknown> = {};

	constructor(
		name: CrudOperationName,
		label: string,
		displayComponent: TemplateComponent,
		fields: Array<Field<Options>>,
		actions: Array<Action> = [],
		eventHandlers: Array<OperationEventCallback> = [],
		options: Record<string, string | unknown> = {}
	) {
		this.name = name;
		this.label = label;
		this.displayComponent = displayComponent;
		this.fields = fields;
		this.actions = actions;
		this.eventHandlers = eventHandlers;
		this.options = options;
	}
}

type FormOperationOptions = object & {
	preventHttpFormSubmit: boolean;
};
const DEFAULT_FORM_OPERATION_OPTION: FormOperationOptions = {
	preventHttpFormSubmit: true
};

export class New<T> extends BaseCrudOperation<T> {
	public readonly options: KeyValueObject = {};

	constructor(
		fields: Array<Field<Options>>,
		actions: Array<Action> = [],
		eventHandlers: Array<OperationEventCallback> = [],
		options: FormOperationOptions = DEFAULT_FORM_OPERATION_OPTION
	) {
		super('new', 'crud.new.label', CrudNew, fields, actions, eventHandlers, options);
	}
}

export class Edit<T> extends BaseCrudOperation<T> {
	constructor(
		fields: Array<Field<Options>>,
		actions: Array<Action> = [],
		eventHandlers: Array<OperationEventCallback> = [],
		options: FormOperationOptions = DEFAULT_FORM_OPERATION_OPTION
	) {
		super('edit', 'crud.edit.label', CrudEdit, fields, actions, eventHandlers, options);
	}
}

type ListOperationOptions = object & {
	globalActions?: Array<Action>;
};

export class List<T> extends BaseCrudOperation<T> {
	constructor(
		fields: Array<Field<Options>>,
		actions: Array<Action> = [],
		eventHandlers: Array<OperationEventCallback> = [],
		options: ListOperationOptions = {}
	) {
		super('list', 'crud.list.label', CrudList, fields, actions, eventHandlers, options);
	}
}

export class Delete<T> extends BaseCrudOperation<T> {
	public readonly redirectTo: Action;

	constructor(
		fields: Array<Field<Options>>,
		redirectTo: Action,
		eventHandlers: Array<OperationEventCallback> = []
	) {
		super('delete', 'crud.delete.label', CrudDelete, fields, [], eventHandlers);
		this.redirectTo = redirectTo;
	}
}

export class View<T> extends BaseCrudOperation<T> {
	constructor(fields: Array<Field<Options>>, eventHandlers: Array<OperationEventCallback> = []) {
		super('view', 'crud.view.label', CrudView, fields, [], eventHandlers);
	}
}
