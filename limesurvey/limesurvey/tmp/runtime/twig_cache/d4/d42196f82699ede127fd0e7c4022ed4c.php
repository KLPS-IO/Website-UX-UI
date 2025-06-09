<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* __string_template__34bfedd463407f11f2359ce3a3deb1c1 */
class __TwigTemplate_ccae84ff5a0f424c6d3298f07df0ceb1 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        yield "<div class=\"card card-primary h-100\">
    <div class=\"card-header\">
        <h5 class=\"card-title\">";
        // line 3
        yield gT("Database usage");
        yield "</h5>
    </div>
    <ul class=\"list-group list-group-flush\">
        <!-- usage -->
        ";
        // line 7
        if ((($context["tableusage"] ?? null) != false)) {
            // line 8
            yield "            ";
            if (((CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "dbtype", [], "any", false, false, true, 8) == "mysql") || (CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "dbtype", [], "any", false, false, true, 8) == "mysqli"))) {
                // line 9
                yield "                ";
                $context["column_usage"] = (((($__internal_compile_0 = CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "column", [], "any", false, false, true, 9)) && is_array($__internal_compile_0) || $__internal_compile_0 instanceof ArrayAccess && in_array(get_class($__internal_compile_0), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_0[0] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "column", [], "any", false, false, true, 9), 0, [], "array", false, false, true, 9)) / (($__internal_compile_1 = CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "column", [], "any", false, false, true, 9)) && is_array($__internal_compile_1) || $__internal_compile_1 instanceof ArrayAccess && in_array(get_class($__internal_compile_1), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_1[1] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "column", [], "any", false, false, true, 9), 1, [], "array", false, false, true, 9))) * 100);
                // line 10
                yield "                ";
                $context["size_usage"] = (((($__internal_compile_2 = CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "size", [], "any", false, false, true, 10)) && is_array($__internal_compile_2) || $__internal_compile_2 instanceof ArrayAccess && in_array(get_class($__internal_compile_2), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_2[0] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "size", [], "any", false, false, true, 10), 0, [], "array", false, false, true, 10)) / (($__internal_compile_3 = CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "size", [], "any", false, false, true, 10)) && is_array($__internal_compile_3) || $__internal_compile_3 instanceof ArrayAccess && in_array(get_class($__internal_compile_3), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_3[1] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "size", [], "any", false, false, true, 10), 1, [], "array", false, false, true, 10))) * 100);
                // line 11
                yield "                <li class=\"list-group-item p-0 border-0\">
                    <div class=\"ls-flex-row col-12\">
                        <div class=\"col-4\">
                            ";
                // line 14
                yield gT("Table column usage");
                yield ":
                        </div>
                        <div class=\"col-8\">
                            <div class='progressbar' style='width:";
                // line 17
                yield Twig\Extension\CoreExtension::round($this->sandbox->ensureToStringAllowed(($context["column_usage"] ?? null), 17, $this->source));
                yield "%; height:15px;' name='";
                yield Twig\Extension\CoreExtension::round($this->sandbox->ensureToStringAllowed(($context["column_usage"] ?? null), 17, $this->source), 2);
                yield "'></div>
                        </div>
                    </div>
                </li>
                <li class=\"list-group-item p-0 border-0\">
                    <div class=\"ls-flex-row col-12\">
                        <div class=\"col-4\">
                            ";
                // line 24
                yield gT("Table size usage");
                yield "
                        </div>
                        <div class=\"col-8\">
                            <div class='progressbar' style='width:";
                // line 27
                yield Twig\Extension\CoreExtension::round($this->sandbox->ensureToStringAllowed(($context["size_usage"] ?? null), 27, $this->source));
                yield "%; height:15px;' name='";
                yield Twig\Extension\CoreExtension::round($this->sandbox->ensureToStringAllowed(($context["size_usage"] ?? null), 27, $this->source), 2);
                yield "'></div>
                        </div>
                    </div>
                </li>
            ";
            } elseif ((((CoreExtension::getAttribute($this->env, $this->source,             // line 31
($context["arrCols"] ?? null), "dbtype", [], "any", false, false, true, 31) == "mssql") || (CoreExtension::getAttribute($this->env, $this->source, ($context["arrCols"] ?? null), "dbtype", [], "any", false, false, true, 31) == "postgre")) || (CoreExtension::getAttribute($this->env, $this->source, ($context["arrCols"] ?? null), "dbtype", [], "any", false, false, true, 31) == "dblib"))) {
                // line 32
                yield "                ";
                $context["column_usage"] = (((($__internal_compile_4 = CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "column", [], "any", false, false, true, 32)) && is_array($__internal_compile_4) || $__internal_compile_4 instanceof ArrayAccess && in_array(get_class($__internal_compile_4), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_4[0] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "column", [], "any", false, false, true, 32), 0, [], "array", false, false, true, 32)) / (($__internal_compile_5 = CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "column", [], "any", false, false, true, 32)) && is_array($__internal_compile_5) || $__internal_compile_5 instanceof ArrayAccess && in_array(get_class($__internal_compile_5), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_5[1] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["tableusage"] ?? null), "column", [], "any", false, false, true, 32), 1, [], "array", false, false, true, 32))) * 100);
                // line 33
                yield "                <li class=\"list-group-item p-0 border-0\">
                    <div class=\"ls-flex-row col-12\">
                        <div class=\"col-4\">
                            ";
                // line 36
                yield gT("Table column usage");
                yield "
                        </div>
                        <div class=\"col-8\">
                            <div class='progressbar' style='width:";
                // line 39
                yield Twig\Extension\CoreExtension::round($this->sandbox->ensureToStringAllowed(($context["column_usage"] ?? null), 39, $this->source));
                yield "%; height:15px;' name='";
                yield Twig\Extension\CoreExtension::round($this->sandbox->ensureToStringAllowed(($context["column_usage"] ?? null), 39, $this->source), 2);
                yield "'></div>
                        </div>
                    </div>
                </li>
            ";
            }
            // line 44
            yield "        ";
        } else {
            // line 45
            yield "        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
                ";
            // line 47
            yield gT("No info or no data found");
            yield "
            </div>
        </li>
        ";
        }
        // line 51
        yield "    </ul>
</div>

";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "__string_template__34bfedd463407f11f2359ce3a3deb1c1";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  140 => 51,  133 => 47,  129 => 45,  126 => 44,  116 => 39,  110 => 36,  105 => 33,  102 => 32,  100 => 31,  91 => 27,  85 => 24,  73 => 17,  67 => 14,  62 => 11,  59 => 10,  56 => 9,  53 => 8,  51 => 7,  44 => 3,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__34bfedd463407f11f2359ce3a3deb1c1", "");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 7, "set" => 9);
        static $filters = array("round" => 17);
        static $functions = array("gT" => 3);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                ['round'],
                ['gT'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
