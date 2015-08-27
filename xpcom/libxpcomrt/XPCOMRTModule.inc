    COMPONENT(MEMORY, nsMemoryImpl::Create)
    COMPONENT(DEBUG,  nsDebugImpl::Create)
    COMPONENT(CATEGORYMANAGER, nsCategoryManager::Create)
    COMPONENT(OBSERVERSERVICE, nsObserverService::Create)
    COMPONENT(TIMER, nsTimerImplConstructor)
    COMPONENT(THREADMANAGER, nsThreadManagerGetSingleton)
    COMPONENT(THREADPOOL, nsThreadPoolConstructor)
    COMPONENT(UUID_GENERATOR, nsUUIDGeneratorConstructor)