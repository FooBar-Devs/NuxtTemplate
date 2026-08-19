export interface DocsNavItem {
    title: string;
    description: string;
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
                path: '/components/inputs/text',
                status: 'ready',
            },
            {
                title: 'Text Area Input',
                description: 'Multi-line input with auto-resizing, max length, and vee-validate integration.',
                path: '/components/inputs/textarea',
                status: 'ready',
            },
            {
                title: 'Number Input',
                description: 'Single-line input with increment/decrement buttons, wheel support & vee-validate integration.',
                path: '/components/inputs/number',
                status: 'ready',
            },
            {
                title: 'Checkbox Input',
                description: 'Single-line checkbox input with vee-validate integration.',
                path: '/components/inputs/checkbox',
                status: 'needs-review',
            },
            {
                title: 'Dropdown',
                description: 'Selection list patterns, examples, and behavior notes.',
                path: '/components/inputs/dropdown',
                status: 'in-progress',
            },
            {
                title: 'Color',
                description: 'Color picker trigger used by theme editing surfaces.',
                path: '/components/inputs/color',
                status: 'in-progress',
            },
            {
                title: 'Label',
                description: 'Reusable field label with description and required marker.',
                path: '/components/inputs/label',
                status: 'needs-review',
            },
            {
                title: 'Error Message',
                description: 'Animated validation feedback component.',
                path: '/components/inputs/errormessage',
                status: 'needs-review',
            },
            {
                title: 'Input Wrapper',
                description: 'Shared field wrapper for label, input, and error.',
                path: '/components/inputs/wrapper',
                status: 'needs-review',
            },
        ],
    },
    {
        title: 'Buttons',
        items: [
            {
                title: 'Button',
                description: 'Action variants, states, and usage guidance.',
                path: '/components/buttons',
                status: 'ready',
            },
            {
                title: 'Toggle',
                description: 'Compact binary switch with icon animations.',
                path: '/components/buttons/toggle',
                status: 'in-progress',
            },
            {
                title: 'Collapse Button',
                description: 'Directional compact trigger for collapsible UI panels.',
                path: '/components/buttons/collapse',
                status: 'in-progress',
            },
        ]
    }, 
    {
        title: 'Images',
        items: [

            {
                title: 'Image Preview',
                description: 'Square image preview with pixel-art detection.',
                path: '/components/images/preview',
                status: 'in-progress',
            },
        ]
    },
];

export const docsReadyItems = docsSections.flatMap((section) =>
    section.items.filter((item) => item.status === 'ready')
);