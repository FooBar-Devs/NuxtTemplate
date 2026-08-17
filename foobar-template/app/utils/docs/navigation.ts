export interface DocsNavItem {
    title: string;
    description: string;
    icon: string;
    path?: string;
    status: 'ready' | 'planned' | 'needs-review' | 'in-progress';
}

export interface DocsNavSection {
    title: string;
    items: DocsNavItem[];
}

export const docsSections: DocsNavSection[] = [
    {
        title: 'Getting Started',
        items: [
            {
                title: 'Overview',
                description: 'Browse the component docs, examples, and testing pages.',
                icon: 'tabler:home-2',
                path: '/components',
                status: 'needs-review',
            },
        ],
    },
    {
        title: 'Inputs',
        items: [
            {
                title: 'Text Input',
                description: 'Single-line input with vee-validate integration.',
                icon: 'tabler:text-size',
                path: '/components/textinput',
                status: 'needs-review',
            },
            {
                title: 'Number Input',
                description: 'Single-line input with increment/decrement buttons, wheel support & vee-validate integration.',
                icon: 'tabler:123',
                path: '/components/numberinput',
                status: 'in-progress',
            },
            {
                title: 'Text Area',
                description: 'Multiline input documentation and examples.',
                icon: 'tabler:align-box-left-stretch',
                path: '/components/textarea',
                status: 'in-progress',
            },
            {
                title: 'Dropdown',
                description: 'Selection list patterns, examples, and behavior notes.',
                icon: 'tabler:selector',
                path: '/components/dropdown',
                status: 'in-progress',
            },
            {
                title: 'CheckBox',
                description: 'Boolean input patterns, warning states, and label behavior.',
                icon: 'tabler:checkbox',
                path: '/components/checkbox',
                status: 'in-progress',
            },
            {
                title: 'Toggle',
                description: 'Compact binary switch with icon animations.',
                icon: 'tabler:toggle-left',
                path: '/components/toggle',
                status: 'in-progress',
            },
            {
                title: 'Button',
                description: 'Action variants, states, and usage guidance.',
                icon: 'tabler:rectangle-rounded-top',
                path: '/components/button',
                status: 'ready',
            },
            {
                title: 'Collapse Button',
                description: 'Directional compact trigger for collapsible UI panels.',
                icon: 'tabler:chevron-left',
                path: '/components/collapsebutton',
                status: 'in-progress',
            },
            {
                title: 'Color',
                description: 'Color picker trigger used by theme editing surfaces.',
                icon: 'tabler:palette',
                path: '/components/color',
                status: 'in-progress',
            },
            {
                title: 'Error Message',
                description: 'Animated validation feedback component.',
                icon: 'tabler:alert-circle',
                path: '/components/errormessage',
                status: 'needs-review',
            },
            {
                title: 'Image Preview',
                description: 'Square image preview with pixel-art detection.',
                icon: 'tabler:photo',
                path: '/components/imagepreview',
                status: 'in-progress',
            },
            {
                title: 'Input Wrapper',
                description: 'Shared field wrapper for label, input, and error.',
                icon: 'tabler:box-padding',
                path: '/components/inputwrapper',
                status: 'needs-review',
            },
            {
                title: 'Label',
                description: 'Reusable field label with description and required marker.',
                icon: 'tabler:abc',
                path: '/components/label',
                status: 'needs-review',
            },
        ],
    },
];

export const docsReadyItems = docsSections.flatMap((section) =>
    section.items.filter((item) => item.status === 'ready')
);