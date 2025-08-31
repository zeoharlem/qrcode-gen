import type {MDXComponents} from 'mdx/types'

const components: MDXComponents = {
    h1: ({children}) => (
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{children}</h1>
    ),
    h2: ({children}) => (
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">{children}</h2>
    ),
    p: ({children}) => (
        <p className="text-gray-700 leading-relaxed mb-3">{children}</p>
    ),
    strong: ({children}) => (
        <strong className="font-semibold text-black">{children}</strong>
    ),
}

export function useMDXComponents(override: MDXComponents = {}): MDXComponents {
    return {...components, ...override}
}