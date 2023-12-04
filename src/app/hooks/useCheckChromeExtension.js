import { useEffect, useState } from 'react';

import chromeExtensionConfig from '../config/chromeExtension';

export default function useToken() {
  const [hasExtension, setHasExtension] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line no-undef
      console.log('chrome  ', chrome.runtime);
      // eslint-disable-next-line no-undef
      chrome?.runtime.sendMessage(
        chromeExtensionConfig.extensionId,
        { message: 'version' },
        reply => {
          console.log('reply   ', reply);
          if (reply) {
            if (reply.version) {
              if (reply.version >= chromeExtensionConfig.version) {
                setHasExtension(true);
              }
            }
          } else {
            setHasExtension(false);
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    hasExtension,
  };
}
