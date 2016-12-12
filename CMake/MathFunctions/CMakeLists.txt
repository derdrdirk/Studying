install (TARGETS MathFunctions DESTINATION bin)
install (FILES MathFunctions.h DESTINATION include)

add_library(MathFunctions mysqrt.cxx)
