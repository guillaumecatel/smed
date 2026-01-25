import { composeStories } from '@storybook/react-vite'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import * as stories from '@/Button.stories'

const { Playground } = composeStories(stories)

describe('<Button /> story', () => {
  it('should renders story with default args', () => {
    render(<Playground>Click me</Playground>)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
    expect(button).not.toHaveAttribute('disabled')
  })
})
