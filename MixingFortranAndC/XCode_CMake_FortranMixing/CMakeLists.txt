cmake_minimum_required(VERSION 3.7.0)
project(mixing CXX Fortran)

set(${CMAKE_Fortran_COMPILER} /opt/local/bin/gfortran)

add_executable(mixing 
testC.cpp
testF.f
)
