cmake_minimum_required(VERSION 3.7.0)
project(mixing CXX Fortran)

add_executable(mixing 
main.cpp
teubner.f
)
