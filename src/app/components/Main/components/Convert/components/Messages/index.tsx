import React, { useCallback, useState } from 'react';

import useProgressStore from '@/stores/progress';

import styles from './index.module.scss';
import type { MessagesProps } from './index.types';
import { FaExpand } from 'react-icons/fa6';
import { Dialog } from 'fajarma-react-lib';

const Messages = ({ display }: MessagesProps) => {
  const [expand, setExpand] = useState(false);

  const converting = useProgressStore((state) => state.converting);
  const isError = useProgressStore((state) => state.isError);
  const messages = useProgressStore((state) => state.messages);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const scrollToBottom = useCallback(
    (node: HTMLParagraphElement) => {
      if (node && messages.length) node.scrollTop = node.scrollHeight;
    },
    [messages.length]
  );

  return (
    <>
      <div className={styles.container}>
        <div
          ref={scrollToBottom}
          className={styles.logs}
          data-error={isError || undefined}
          data-display={display || undefined}
        >
          {messages.map((item, index) => (
            <p key={`msg-${index}`}>{item}</p>
          ))}
        </div>

        {!converting && display && (
          <button
            type="button"
            className={styles.expandBtn}
            onClick={toggleExpand}
          >
            <FaExpand size={12} />
          </button>
        )}
      </div>
      <Dialog
        display={expand}
        className={styles.dialogModifier}
        onClose={toggleExpand}
      >
        <h3>Logs: {isError ? 'Error' : 'Finished'}</h3>
        <div className={styles.expandedLogs} data-error={isError || undefined}>
          <ul>
            {messages.map((item, index) => (
              <li key={`msg-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </Dialog>
    </>
  );
};

export default Messages;
