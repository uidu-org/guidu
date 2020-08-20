import loadable from '@loadable/component';
import FieldMentions, { defaultStyle } from '@uidu/field-mentions';
import FieldText from '@uidu/field-text';
import { Form, FormFooter, FormMeta, FormSubmit } from '@uidu/form';
import MediaFilmstrip from '@uidu/media-filmstrip';
import Spinner from '@uidu/spinner';
import classNames from 'classnames';
import Formsy from 'formsy-react';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Send, Smile, ThumbsUp } from 'react-feather';
import { MessageFormProps } from '../types';
import MessageFormActions from './MessageFormActions';
import MessageFormReplyTo from './MessageFormReplyTo';

const LoadableEmojiPicker = loadable(() => import('./MessageFormEmojiPicker'));

function MessageSender({
  loading = false,
  canSubmit = false,
  label = null,
  handleThumb = null,
}) {
  if (handleThumb) {
    return (
      <button
        className="btn-sm btn-teams ml-2 d-flex align-items-center"
        type="button"
        onClick={handleThumb}
      >
        <ThumbsUp size={18} />
      </button>
    );
  }

  return (
    <FormSubmit
      className="btn-sm btn-teams ml-2 d-flex align-items-center"
      label={label || <Send className="d-flex" size={18} />}
      loading={loading}
      canSubmit={canSubmit}
    />
  );
}

function MessagesForm({
  actions = [],
  attachments = [],
  placeholder = 'Add your message...',
  message,
  createMessage,
  updateMessage,
  mentionables,
  onDismiss,
  onSubmit,
  onReplyDismiss,
  forwardedRef,
}: MessageFormProps) {
  const form: React.RefObject<Formsy> = useRef(null);
  const suggestionsPortal: React.RefObject<any> = useRef(null);
  const mentionsInput: React.RefObject<any> = useRef(null);

  useImperativeHandle(forwardedRef, () => mentionsInput.current);

  const [emojiPicker, setEmojiPicker] = useState(false);
  const [isThumbMessageAllowed, setIsThumbMesssageAllowed] = useState(
    message.body || attachments.length > 0 ? false : true,
  );

  useEffect(() => {
    if (attachments.length > 0) {
      setIsThumbMesssageAllowed(false);
    }
    return () => null;
  }, [attachments.length]);

  const isValid = (canSubmit: boolean): boolean => {
    if (attachments.length > 0) {
      return attachments.filter((a) => !a.id).length === 0 && canSubmit;
    }
    return canSubmit;
  };

  const handleSubmitLabel = (_name: string, value: string | Object): void => {
    if (value !== '') {
      setIsThumbMesssageAllowed(false);
    } else {
      setIsThumbMesssageAllowed(message.body ? false : true);
    }
  };

  const handleSubmit = (model: any): Promise<any> => {
    const { replyTo } = message;
    const modelToSubmit = {
      ...model,
      ...(replyTo && {
        replyToId: replyTo.id,
      }),
      body: model.body && model.body.value,
      mentions: model.body ? model.body.mentions : [],
    };
    if (!message.id) {
      return createMessage(modelToSubmit);
    }
    return updateMessage(message, modelToSubmit);
  };

  const handleThumb = () => {
    return createMessage({
      message: {
        body: '👍',
      },
    });
  };

  const { replyTo } = message;

  return (
    <>
      {replyTo && !message.body && (
        <MessageFormReplyTo replyTo={replyTo} onReplyDismiss={onReplyDismiss} />
      )}
      <div
        className={classNames('bg-white position-relative', {
          border: !!message.body,
          'border-top p-3': !message.body,
        })}
      >
        {attachments.length > 0 && (
          <MediaFilmstrip files={attachments.map(({ file }) => file)} />
        )}
        <div
          id="suggestionPortal"
          style={{
            maxHeight: '400px',
            position: 'absolute',
            width: '100%',
            left: 0,
            bottom: '100%',
            zIndex: 3000,
          }}
          ref={suggestionsPortal}
        />
        <Form
          ref={form}
          handleSubmit={async (model: any) => {
            await handleSubmit(model);
            setIsThumbMesssageAllowed(true);
            setEmojiPicker(false);
            onReplyDismiss();
            form.current.reset();
          }}
          className={classNames('', {
            'd-flex': !message.body,
          })}
          inputsWrapperProps={{
            className: 'd-flex flex-grow-1',
          }}
          footerRenderer={({
            loading,
            canSubmit,
          }: {
            loading: boolean;
            canSubmit: boolean;
          }) => {
            if (message.body) {
              return (
                <div className="px-2 pb-3">
                  <FormFooter>
                    <FormMeta className="d-flex">
                      <MessageSender
                        loading={loading}
                        canSubmit={isValid(canSubmit)}
                        label="Salva"
                      />
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          onDismiss();
                        }}
                      >
                        Annulla
                      </button>
                    </FormMeta>
                  </FormFooter>
                </div>
              );
            }
            return (
              <div className="d-flex align-items-center align-self-center">
                <button
                  className="btn btn-sm d-none d-md-flex align-items-center mb-0 text-muted px-2 shadow-none"
                  type="button"
                  onClick={() => {
                    setEmojiPicker(!emojiPicker);
                  }}
                >
                  <Smile size={18} />
                </button>
                <MessageSender
                  loading={loading}
                  canSubmit={isValid(canSubmit)}
                  {...(isThumbMessageAllowed ? { handleThumb } : {})}
                />
              </div>
            );
          }}
        >
          {!message.body && actions.length > 0 && (
            <MessageFormActions actions={actions} />
          )}
          <div className="d-flex align-items-center flex-grow-1">
            <FieldMentions
              componentRef={mentionsInput}
              className={classNames('border-0 shadow-none', {
                'mr-2': !message.body,
              })}
              layout="elementOnly"
              name="body"
              onChange={handleSubmitLabel}
              required={attachments.length === 0}
              value={message.body ? { value: message.body } : ''}
              onKeyDown={(event: React.KeyboardEvent) => {
                if (event.keyCode === 13 && !event.shiftKey) {
                  event.preventDefault();
                  form.current.submit();
                }
              }}
              placeholder={placeholder}
              autoFocus={!!message.body}
              items={mentionables}
              style={{
                ...defaultStyle,
                suggestions: {
                  ...defaultStyle.suggestions,
                  marginTop: 0,
                  position: 'relative',
                  top: 0,
                  left: 0,
                  list: {
                    ...defaultStyle.suggestions.list,
                    boxShadow: 'none',
                    // borderTop: '1px solid #e7e7e7',
                    borderBottom: '1px solid #e7e7e7',
                    maxHeight: '13rem',
                    overflow: 'auto',
                  },
                },
              }}
              suggestionsPortalHost={suggestionsPortal.current}
            />
            {attachments.map((attachment, index) => (
              <FieldText
                key={attachment.id}
                type="hidden"
                name={`attachments[${index}][file]`}
                value={attachment}
              />
            ))}
          </div>
        </Form>
        {emojiPicker && (
          <LoadableEmojiPicker
            fallback={
              <div className="p-3 d-flex align-items-center justify-content-center">
                <Spinner />
              </div>
            }
            mentionsInput={mentionsInput}
          />
        )}
      </div>
    </>
  );
}

export default forwardRef((props: MessageFormProps, ref) => (
  <MessagesForm {...(props as MessageFormProps)} forwardedRef={ref} />
));
