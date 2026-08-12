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
                path: '/testing',
                status: 'ready',
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
                path: '/testing/textinput',
                status: 'ready',
            },
            {
                title: 'Number Input',
                description: 'Single-line input with increment/decrement buttons, wheel support & vee-validate integration.',
                icon: 'tabler:123',
                path: '/testing/numberinput',
                status: 'ready',
            },
            {
                title: 'Text Area',
                description: 'Multiline input documentation and examples.',
                icon: 'tabler:align-box-left-stretch',
                path: '/testing/textarea',
                status: 'in-progress',
            },
            {
                title: 'Dropdown',
                description: 'Selection list patterns, examples, and behavior notes.',
                icon: 'tabler:selector',
                path: '/testing/dropdown',
                status: 'in-progress',
            },
            {
                title: 'CheckBox',
                description: 'Boolean input patterns, warning states, and label behavior.',
                icon: 'tabler:checkbox',
                path: '/testing/checkbox',
                status: 'in-progress',
            },
            {
                title: 'Toggle',
                description: 'Compact binary switch with icon animations.',
                icon: 'tabler:toggle-left',
                path: '/testing/toggle',
                status: 'in-progress',
            },
            {
                title: 'Button',
                description: 'Action variants, states, and usage guidance.',
                icon: 'tabler:rectangle-rounded-top',
                path: '/testing/button',
                status: 'in-progress',
            },
            {
                title: 'Collapse Button',
                description: 'Directional compact trigger for collapsible UI panels.',
                icon: 'tabler:chevron-left',
                path: '/testing/collapsebutton',
                status: 'in-progress',
            },
            {
                title: 'Color',
                description: 'Color picker trigger used by theme editing surfaces.',
                icon: 'tabler:palette',
                path: '/testing/color',
                status: 'in-progress',
            },
            {
                title: 'Error Message',
                description: 'Animated validation feedback component.',
                icon: 'tabler:alert-circle',
                path: '/testing/errormessage',
                status: 'ready',
            },
            {
                title: 'Image Preview',
                description: 'Square image preview with pixel-art detection.',
                icon: 'tabler:photo',
                path: '/testing/imagepreview',
                status: 'in-progress',
            },
            {
                title: 'Input Wrapper',
                description: 'Shared field wrapper for label, input, and error.',
                icon: 'tabler:box-padding',
                path: '/testing/inputwrapper',
                status: 'ready',
            },
            {
                title: 'Label',
                description: 'Reusable field label with description and required marker.',
                icon: 'tabler:abc',
                path: '/testing/label',
                status: 'ready',
            },
        ],
    },
];

export const docsReadyItems = docsSections.flatMap((section) =>
    section.items.filter((item) => item.status === 'ready')
);