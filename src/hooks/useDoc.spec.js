import { renderHook } from '@testing-library/react-hooks'
import { createMockClient } from 'cozy-client/dist/mock'

import useDoc from './useDoc'
import { officeDocParam } from '../../test/fixtures'

const client = createMockClient({})
const fileId = 'abc123'

describe('useDoc', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call the stack with the correct route', async () => {
    client.stackClient.fetchJSON.mockImplementation(() => officeDocParam)
    const { waitForNextUpdate } = renderHook(() => useDoc({ client, fileId }))

    await waitForNextUpdate()

    const fetchJSON = client.stackClient.fetchJSON
    const called = fetchJSON.mock.calls.length
    const lastCall = fetchJSON.mock.calls[called - 1]

    expect(client.stackClient.fetchJSON).toHaveBeenCalled()
    expect(lastCall[0]).toBe('GET')
    expect(lastCall[1]).toBe(`/office/${fileId}/open`)
  })

  it('should return the server response and no loading if everything goes right', async () => {
    client.stackClient.fetchJSON.mockImplementation(() => officeDocParam)
    const { result, waitForNextUpdate } = renderHook(() =>
      useDoc({ client, fileId })
    )

    expect(result.current.loading).toBeTruthy()
    expect(result.current.doc).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.loading).toBeFalsy()
    expect(result.current.doc).toMatchObject(officeDocParam)
  })

  it('should return error and no loading if something goes wrong', async () => {
    const errorServerResponse = new Error('Oops')
    client.stackClient.fetchJSON.mockImplementation(() => errorServerResponse)
    const { result, waitForNextUpdate } = renderHook(() =>
      useDoc({ client, fileId })
    )
    await waitForNextUpdate()

    const res = result.current
    const { loading, doc } = res

    expect(loading).toBeFalsy()
    expect(doc).toMatchObject(errorServerResponse)
  })

  it('should return correct result after rerender with new props', async () => {
    client.stackClient.fetchJSON.mockImplementation(() => officeDocParam)
    let id = fileId
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useDoc({ client, fileId: id })
    )

    expect(result.current.loading).toBeTruthy()
    expect(result.current.doc).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.loading).toBeFalsy()
    expect(result.current.doc).toMatchObject(officeDocParam)

    id = '456'
    client.stackClient.fetchJSON.mockImplementation(() => ({
      data: { id: '456' }
    }))
    rerender()
    expect(result.current.loading).toBeTruthy()
    expect(result.current.doc).toBeUndefined()

    await waitForNextUpdate()

    expect(result.current.loading).toBeFalsy()
    expect(result.current.doc).toMatchObject({ data: { id: '456' } })
  })
})
