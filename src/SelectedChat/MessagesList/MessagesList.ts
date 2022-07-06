import { ref } from '@vue/composition-api';

const useMessagesList = ({ emit }: any) => {
  const messagesContainer = ref();
  const appendScrollButton = ref(false);

  const preventTopScroll = () => {
    const container = messagesContainer.value;
    const prevScrollHeight = container.scrollHeight;
    const observer = new ResizeObserver((_) => {
      if (container.scrollHeight !== prevScrollHeight) {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTo({
            top: container.scrollHeight - prevScrollHeight
          });
          observer.disconnect();
        }
      }
    });
    for (let i = 0; i < container.children.length; i++) {
      observer.observe(container.children[i]);
    }
    emit('loadMoreMessages');
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: 'smooth'
      });
    }, 50);
  };

  const getBottomScroll = (el: any) => {
    const { scrollHeight, clientHeight, scrollTop } = el;
    return scrollHeight - clientHeight - scrollTop;
  };

  const onContainerScroll = (e: any) => {
    if (!e.target) return;
    const bottomScroll = getBottomScroll(e.target);
    appendScrollButton.value = bottomScroll > 400;
  };

  return {
    messagesContainer,
    scrollToBottom,
    onContainerScroll,
    preventTopScroll,
    appendScrollButton
  };
};

export default useMessagesList;
