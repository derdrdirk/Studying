cmake_minimum_required(VERSION 2.8.9)
project (TestLibrary)

#For the shared library:
set ( PROJECT_LINK_LIBS  libtestStudent.so )
link_directories(/Users/Knowledge/Developer/Tutorials/CMake2/exploringBB/extras/cmake/studentlib_shared/build )

#For the static library:
#set ( PROJECT_LINK_LIBS libtestStudent.a )
#link_directories( ~/exploringBB/extras/cmake/studentlib_static/build )

include_directories(/Users/Knowledge/Developer/Tutorials/CMake2/Example3/include)

add_executable(libtest libtest.cpp)
target_link_libraries(libtest ${PROJECT_LINK_LIBS} )
