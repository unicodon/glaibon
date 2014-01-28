converter=../../utils/converters/obj/convert_obj_three.py

for i in *.obj
do
	python $converter -i $i -o ../`basename $i .obj`.js
done
