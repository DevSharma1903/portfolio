let lenisInstance = null;

export function setLenisInstance(instance) {
  lenisInstance = instance;
}

export function scrollToTarget(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, left: 0, behavior: options.immediate ? 'instant' : 'smooth' });
    return;
  }

  const element = typeof target === 'string' ? document.querySelector(target) : target;
  element?.scrollIntoView({ behavior: options.immediate ? 'instant' : 'smooth', block: 'start' });
}
