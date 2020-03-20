import clone from 'lodash.clone';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { ChatViewProps } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAlignTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  emptyChatContainer: {
    flex: 1,
    transform: [{ scaleY: -1 }],
  },
  headerWrapper: {
    flex: 1,
  },
  listStyle: {
    flex: 1,
  },
  scrollToBottomStyle: {
    opacity: 0.8,
    position: 'absolute',
    right: 10,
    bottom: 30,
    zIndex: 999,
    height: 40,
    width: 40,
    borderRadius: 20,
    // backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: Color.black,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
  },
});

function ChatView({
  scrollLoadThreshold = 300,
  shouldTriggerLoad = () => {
    return true;
  },
  loadingSpinnerDelegate = <div>Loading</div>,
  className = '',
  children,
  reversed,
  forwardedRef,
  flipped = Platform.OS !== 'web',
}: ChatViewProps) {
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const [messages, setMessages] = useState(children);

  const scrollable: React.RefObject<FlatList> = useRef(null);
  const loadingSpinner: React.RefObject<HTMLDivElement> = useRef(null);
  const rafRequestId: number | null = null; // for cleaning up outstanding requestAnimationFrames on WillUnmount
  const scrollHeight: number | undefined = undefined; // it's okay, this won't be read until the second render.

  useImperativeHandle(forwardedRef, () => scrollable.current);

  const onScroll = event => {
    console.log(event);
    if (isInfiniteLoading) return;
    const {
      nativeEvent: {
        contentOffset: { y },
      },
    } = event;
    if (y === 0) {
      setIsInfiniteLoading(true);
      setTimeout(() => {
        setMessages([...messages, ...children]);
        setIsInfiniteLoading(false);
      }, 3000);
      console.log('should trigger');
    }
  };

  useEffect(() => {
    console.log(scrollable.current);
    scrollable.current.scrollToOffset({
      offset: 0,
      animated: false,
    });
    return () => null;
  }, []);

  const displayables = clone(messages);
  if (!flipped) {
    displayables.reverse();
  }

  const loadSpinner = (
    <div ref={loadingSpinner}>
      {isInfiniteLoading ? loadingSpinnerDelegate : null}
    </div>
  );

  console.log(scrollable);
  console.log(children);

  const scrollTo = (options: { animated?: boolean; offset: number }) => {
    if (scrollable && scrollable.current && options) {
      scrollable.current.scrollToOffset(options);
    }
  };

  const scrollToBottom = (animated: boolean = true) => {
    if (flipped) {
      scrollTo({ offset: 0, animated });
    } else if (scrollable && scrollable.current) {
      scrollable.current.scrollToEnd({ animated });
    }
  };

  const onLayoutList = () => {
    if (!flipped) {
      setTimeout(() => scrollToBottom(false), 300);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollable}
        // extraData={[this.props.extraData, this.props.isTyping]}
        keyExtractor={item => item.id}
        // enableEmptySections
        automaticallyAdjustContentInsets={false}
        inverted={flipped}
        data={displayables}
        style={styles.listStyle}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item: Item }) => Item}
        onEndReachedThreshold={100}
        onEndReached={console.log}
        // {...this.props.invertibleScrollViewProps}
        // ListEmptyComponent={this.renderChatEmpty}
        // ListFooterComponent={
        //   inverted ? this.renderHeaderWrapper : this.renderFooter
        // }
        // ListHeaderComponent={
        //   inverted ? this.renderFooter : this.renderHeaderWrapper
        // }
        // onScroll={this.handleOnScroll}
        // scrollEventThrottle={100}
        onLayout={onLayoutList}
        // onRefresh={console.log}
        // refreshing={false}
        // refreshControl={<div>Loading</div>}
        // {...this.props.listViewProps}
      />
    </View>
  );
}

export default forwardRef((props: ChatViewProps, ref) => (
  <ChatView {...props} forwardedRef={ref} />
));
