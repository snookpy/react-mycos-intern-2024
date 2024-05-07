import useThaiWin from './useThaiWin'
import  * as api from '../../api/weWinApi'
import { act, renderHook } from '@testing-library/react'

describe('useThaiWin', () => {
    test('fully return;', () => {
        // Arrange & Act
        const { result } = renderHook(useThaiWin)

        // Assert
        expect(result.current).toEqual([
            expect.any(Boolean),
            expect.any(Function),
            expect.any(Function),
        ])
    })

    test('when enter once then exit once, should working correctly', () => {
        // Arrange
        const mockEnterThaiWinAPI = vi.spyOn(api, 'enterThaiWin')
        const mockExitThaiWinAPI = vi.spyOn(api, 'exitThaiWin')
        const { result } = renderHook(useThaiWin)

        // Act
        act(() => {
            result.current[1]()
            result.current[2]()
        })

        expect(mockEnterThaiWinAPI).toHaveBeenCalledTimes(1)
        expect(mockExitThaiWinAPI).toHaveBeenCalledTimes(1)
        expect(result.current[0]).toEqual(false)
    })

    test('when called the enter three times then exit once, should working correctly that call Enter API once and Call Exit API once', () => {
        // Arrange
        const { result } = renderHook(useThaiWin)
        const mockEnterThaiWinAPI = vi.spyOn(api, 'enterThaiWin')
        const mockExitThaiWinAPI = vi.spyOn(api, 'exitThaiWin')

        // Act
        act(() => {
            result.current[1]()
            result.current[1]()
            result.current[1]()
            // call exit
            result.current[2]()
        })

        expect(mockEnterThaiWinAPI).toHaveBeenCalledTimes(1)
        expect(mockExitThaiWinAPI).toHaveBeenCalledTimes(1)
        expect(result.current[0]).toEqual(false)
    })

    test('when enter once but forgot exit will exit auto when close window, should working correctly with call once Enter API then once Exit API', () => {
        // Arrange
        const { result, unmount } = renderHook(useThaiWin)
        const mockEnterThaiWinAPI = vi.spyOn(api, 'enterThaiWin')
        const mockExitThaiWinAPI = vi.spyOn(api, 'exitThaiWin')

        // Act
        act(() => {
            result.current[1]()
            // simulate close window
            unmount()
        })
        
        // Assert
        expect(mockEnterThaiWinAPI).toHaveBeenCalledTimes(1)
        expect(mockExitThaiWinAPI).toHaveBeenCalledTimes(1)
        expect(result.current[0]).toEqual(false)
    })

    test('when no enter and exit, should  no call bot Enter API and Exit API', () => {
        // Arrange
        const { unmount } = renderHook(useThaiWin)
        const mockEnterThaiWinAPI = vi.spyOn(api, 'enterThaiWin')
        const mockExitThaiWinAPI = vi.spyOn(api, 'exitThaiWin')

        // Act
        unmount()

        // Assert
        expect(mockEnterThaiWinAPI).toHaveBeenCalledTimes(0)
        expect(mockExitThaiWinAPI).toHaveBeenCalledTimes(0)
    })
})