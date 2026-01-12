/**
 * Composable for locking screen orientation to portrait mode on mobile devices.
 * This ensures the app respects the user's device orientation lock setting
 * by explicitly locking the orientation to portrait.
 */
export const useScreenOrientation = () => {
  const lockToPortrait = async () => {
    if (!process.client) return

    // Check if screen object and Screen Orientation API are supported
    if (typeof screen !== 'undefined' && screen.orientation && typeof screen.orientation.lock === 'function') {
      try {
        await screen.orientation.lock('portrait')
      } catch (error) {
        // Orientation lock might fail on desktop browsers or when not in fullscreen
        // This is expected behavior and can be silently ignored
        console.debug('Screen orientation lock not available:', error)
      }
    }
  }

  const unlockOrientation = async () => {
    if (!process.client) return

    // Check if screen object and Screen Orientation API are supported
    if (typeof screen !== 'undefined' && screen.orientation && typeof screen.orientation.unlock === 'function') {
      try {
        screen.orientation.unlock()
      } catch (error) {
        console.debug('Screen orientation unlock not available:', error)
      }
    }
  }

  return {
    lockToPortrait,
    unlockOrientation
  }
}
